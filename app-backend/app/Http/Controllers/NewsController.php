<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiHelpers;
use App\Services\NewsApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    // Using the ApiHelpers Trait for common API response methods
    use ApiHelpers;

    // Service class instance to interact with the News API
    protected $newsApiService;

    /**
     * Constructor to initialize NewsApiService.
     *
     * @param NewsApiService $newsApiService
     */
    public function __construct(NewsApiService $newsApiService)
    {
        $this->newsApiService = $newsApiService;
    }

    /**
     * Get top headlines from the News API based on the provided filters.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function topHeadlines(Request $request): JsonResponse
    {
        // Fetch query parameters from the request
        $query = $request->input('q', null);
        $category = $request->input('category', null);
        $sources = $request->input('sources', null);
        $sortBy = $request->input('sortBy', null);

        // Check if both category and sources parameters are provided, which is not allowed
        if ($category != "" && $sources != "") {
            // Return error response if both parameters are provided
            return $this->onError(404, 'Both category and sources parameters cannot be accepted simultaneously; only one parameter is allowed.');
        }

        // Call the service to get top headlines with the provided parameters
        $headlines = $this->newsApiService->getTopHeadlines($query, $category, $sources, $sortBy);

        // Remove unnecessary status field from the response
        unset($headlines['status']);

        // Return success response with the retrieved headlines
        return $this->onSuccess($headlines, 'All Retrieved');
    }

    /**
     * Get all articles from the News API based on the provided filters.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function everything(Request $request): JsonResponse
    {
        // Fetch query parameters from the request
        $query = $request->input('q', 'tesla');
        $sources = $request->input('sources', null);
        $from = $request->input('from', null);
        $to = $request->input('to', null);
        $language = $request->input('language', 'en');
        $sortBy = $request->input('sortBy', 'publishedAt');
        $pageSize = $request->input('pageSize', 100);
        $page = $request->input('pageIndex', 1);

        // Call the service to get all articles with the provided parameters
        $results = $this->newsApiService->getEverything($query, $sources, $from, $to, $language, $sortBy, $pageSize, $page);

        // Remove unnecessary status field from the response
        unset($results['status']);

        // Return success response with the retrieved articles
        return $this->onSuccess($results, 'All Retrieved');
    }
}
