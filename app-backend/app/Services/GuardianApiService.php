<?php

namespace App\Services;

use GuzzleHttp\Client;

class GuardianApiService
{
    // Guzzle HTTP client instance
    protected $client;

    // Base URL for the Guardian API
    protected $baseUrl;

    // API key for accessing the Guardian API
    protected $apiKey;

    /**
     * Constructor to initialize the HTTP client and configuration settings.
     */
    public function __construct()
    {
        // Initialize the Guzzle client
        $this->client = new Client();

        // Set the base URL for the Guardian API from configuration
        $this->baseUrl = config('guardian.base_url');

        // Set the API key from configuration
        $this->apiKey = config('guardian.api_key');
    }

    /**
     * Search for articles in the Guardian API based on various filters.
     *
     * @param string $query The search query.
     * @param string|null $from The start date for the search.
     * @param string|null $to The end date for the search.
     * @param string|null $section The section to filter the search results.
     * @param string|null $source The source to filter the search results.
     * @param int $pageSize The number of results per page.
     * @param int $page The page number.
     * @return array The search results.
     */
    public function searchArticles($query, $from = null, $to = null, $section = null, $source = null, $pageSize = 10, $page = 1)
    {
        // Construct the URL for the search endpoint
        $url = $this->baseUrl . 'search';

        // Set the query parameters for the request
        $params = [
            'api-key' => $this->apiKey,
            'q' => $query,
            'order-by' => 'newest',
            'pageSize' => $pageSize,
            'page' => $page,
        ];

        // Add optional parameters if they are provided
        if ($from) {
            $params['from-date'] = $from;
        }

        if ($to) {
            $params['to-date'] = $to;
        }

        if ($section) {
            $params['section'] = $section;
        }

        if ($source) {
            $params['source'] = $source;
        }

        // Make the GET request to the Guardian API
        $response = $this->client->get($url, ['query' => $params]);

        // Decode and return the response body
        return json_decode($response->getBody()->getContents(), true);
    }

    /**
     * Get the available sections from the Guardian API.
     *
     * @return array The available sections.
     */
    public function getSections()
    {
        // Construct the URL for the sections endpoint
        $url = $this->baseUrl . 'sections';

        // Set the query parameters for the request
        $params = [
            'api-key' => $this->apiKey,
        ];

        // Make the GET request to the Guardian API
        $response = $this->client->get($url, ['query' => $params]);

        // Decode and return the response body
        return json_decode($response->getBody()->getContents(), true);
    }
}
