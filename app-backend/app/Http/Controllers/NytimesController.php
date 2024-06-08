<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiHelpers;
use Illuminate\Http\Request;
use App\Services\NytimesApiService;

class NytimesController extends Controller
{
    // Using the ApiHelpers Trait for common API response methods
    use ApiHelpers;

    // Service class instance to interact with the NYTimes API
    protected $nytimesApiService;

    /**
     * Constructor to initialize NytimesApiService.
     *
     * @param NytimesApiService $nytimesApiService
     */
    public function __construct(NytimesApiService $nytimesApiService)
    {
        $this->nytimesApiService = $nytimesApiService;
    }

    /**
     * Get articles from the NYTimes API based on the provided filters.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getArticles(Request $request)
    {
        // Fetch query parameters from the request
        $query = $request->input('query', '');
        $from = $request->input('from', null);
        $to = $request->input('to', null);
        $section = $request->input('section', null);
        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('pageIndex', 1);

        // Call the service to search for articles with the provided parameters
        $results = $this->nytimesApiService->searchArticles($query, $from, $to, $section, $pageSize, $page);

        // Remove unnecessary status field from the response
        unset($results['status']);

        // Return success response with the retrieved articles
        return $this->onSuccess($results, 'All Retrieved');
    }
}
