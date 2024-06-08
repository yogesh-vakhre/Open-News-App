<?php

namespace App\Services;

use GuzzleHttp\Client;

class NewsApiService
{
    protected $client;
    protected $baseUrl;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->baseUrl = config('newsapi.base_url');
        $this->apiKey = config('newsapi.api_key');
    }

    public function getTopHeadlines($q=null, $category = null,$sources=null,$sortBy='')
    {
        $url = $this->baseUrl . 'top-headlines';
        $query = [
            'apiKey' => $this->apiKey,
        ];

        if ($q) {
            $query['q'] = $q;
        }

        if ($category) {
            $query['category'] = $category;
        }

        if ($sources) {
            $query['sources'] = $sources;
        }
        if ($sortBy) {
            $query['sortBy'] = $sortBy;
        }

        $response = $this->client->get($url, ['query' => $query]);

        return json_decode($response->getBody()->getContents(), true);
    }

    public function getEverything($query, $sources=null, $from = null, $to = null, $language = 'en', $sortBy = 'publishedAt',$pageSize=100,$page=1)
    {
        $url = $this->baseUrl . 'everything';
        $params = [
            'apiKey' => $this->apiKey,
            'q' => $query,
            'language' => $language,
            'sortBy' => $sortBy,
            'pageSize' => $pageSize,
            'page' => $page,
        ];

        if ($sources) {
            $query['sources'] = (string) $sources;
        }

        if ($from) {
            $params['from'] = $from;
        }

        if ($to) {
            $params['to'] = $to;
        }

        $response = $this->client->get($url, ['query' => $params]);

        return json_decode($response->getBody()->getContents(), true);
    }


}
