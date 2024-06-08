<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\ApiHelpers;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    use ApiHelpers; // Using the apiHelpers Trait

    /**
     * Store a newly registered resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request): JsonResponse
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|min:10',

        ]);
        // Return errors if validation error occur.
        if ($validator->fails()) {
            $errors = $validator->errors();
            return $this->onError(404, 'Validation Error.', $errors);
        }
        // Check if validation pass then create user and auth token. Return the auth token
        if ($validator->passes()) {

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),

            ]);

            $token = $user->createToken('auth_token')->plainTextToken;
            $data['token'] =  $token;
            $data['user'] =  $user;
            return $this->onSuccess($data, 'User Created', 201);
        }
    }

    /**
     * login a newly registered resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request): JsonResponse
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|max:50',
            'password' => 'required',
        ]);
        // Return errors if validation error occur.
        if ($validator->fails()) {
            $errors = $validator->errors();
            return $this->onError(404, 'Validation Error.', $errors);
        }
        // Return errors if details not valid.
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->onError(403, 'Invalid login details');
        }
        $user = User::where('email', $request->username)->firstOrFail();


        $token = $user->createToken('auth_token')->plainTextToken;
        $data['token'] =  $token;
        $data['user'] =  $user;

        return $this->onSuccess($data, 'User Logged In Successfully');
    }

    /**
     * Current User detials resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function me(Request $request): JsonResponse
    {
        return $this->onSuccess($request->user(), 'Current User Retrieved');
    }

    /**
     * Current User logout resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request): JsonResponse
    {
        auth()->user()->tokens()->delete();
        return $this->onSuccess($request->user(), 'User Logged Out Successfully');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function updatePreference(Request $request): JsonResponse
    {
        $data = $request->all();

        // Validate request data
        $validator = Validator::make($request->all(), [
            'source' => 'nullable|string',
            'category' => 'nullable|string',
            'author' => 'nullable|string',
        ]);

        // Return errors if validation error occur.
        if ($validator->fails()) {
            $errors = $validator->errors();
            return $this->onError(400, 'Validation Error.', $errors);
        }
        $user = auth()->user();
        // Update user
        $user->update($data);

        return $this->onSuccess($user, 'User Preference Updated');
    }
}
