<?php

namespace App\Http\Traits;

use Illuminate\Http\JsonResponse;

trait ApiHelpers
{

    /**
     * Return a successful JSON response.
     *
     * @param array $data
     * @param string $message
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    protected function onSuccess($data, string $message = '', int $code = 200): JsonResponse
    {
        // Construct the success response
        return response()->json([
            'status' => $code,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    /**
     * Return an error JSON response.
     *
     * @param int $code
     * @param string $message
     * @param array $error
     * @return \Illuminate\Http\JsonResponse
     */
    protected function onError(int $code, string $message = '', $errorMessages = []): JsonResponse
    {
        // Construct the error response
        $response = [
            'status' => $code,
            'message' => $message,
        ];

        // Add error messages if provided
        if (!empty($errorMessages)) {
            $response['errors'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}
