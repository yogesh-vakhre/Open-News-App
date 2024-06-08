<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiHelpers;
use App\Services\GuardianApiService;
use Illuminate\Http\Request;

class GuardianController extends Controller
{
    // Using the ApiHelpers Trait for common API response methods
    use ApiHelpers;

    // Service class instance to interact with the Guardian API
    protected $guardianApiService;

    /**
     * Constructor to initialize GuardianApiService.
     *
     * @param GuardianApiService $guardianApiService
     */
    public function __construct(GuardianApiService $guardianApiService)
    {
        $this->guardianApiService = $guardianApiService;
    }

    /**
     * Get articles from the Guardian API based on the provided filters.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function getArticles(Request $request)
    {
        // Fetch query parameters from the request
        $query = $request->input('q', '');
        $from = $request->input('from', null);
        $to = $request->input('to', null);
        $section = $request->input('category', null);
        $source = $request->input('source', null);
        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('pageIndex', 1);

        // Call the service to search for articles with the provided parameters
        $results = $this->guardianApiService->searchArticles($query, $from, $to, $section, $source, $pageSize, $page);

        // Remove unnecessary status field from the response
        unset($results['response']['status']);

        // Return success response with the retrieved articles
        return $this->onSuccess($results['response'], 'All Retrieved');
    }

    /**
     * Get categories/sections from the Guardian API.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCategories()
    {
        // Call the service to get sections/categories
        $results = $this->guardianApiService->getSections();

        // Remove unnecessary fields from the response
        unset($results['response']['status']);
        unset($results['response']['userTier']);

        // Return success response with the retrieved categories
        return $this->onSuccess($results['response'], 'All Retrieved');
    }
}
