<?php

namespace App\Services;

use GuzzleHttp\Client;

class NytimesApiService
{
    protected $client;
    protected $baseUrl;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->baseUrl = config('nytimes.base_url');
        $this->apiKey = config('nytimes.api_key');
    }

    public function searchArticles($query, $from = null, $to = null, $section = null,$pageSize=10,$page=1)
    {
        $url = $this->baseUrl . 'search/v2/articlesearch.json';
        $params = [
            'api-key' => $this->apiKey,
            'q' => $query,
            'pageSize' => $pageSize,
            'page' => $page,
        ];

        if ($from) {
            $params['begin_date'] = $from;
        }

        if ($to) {
            $params['end_date'] = $to;
        }

        if ($section) {
            $params['fq'] = 'section_name:("' . $section . '")';
        }

        $response = $this->client->get($url, ['query' => $params]);

        return json_decode($response->getBody()->getContents(), true);
    }

    public function getSections()
    {
        // NYT doesn't have a dedicated endpoint for sections in the search API
        // You'll need to hardcode or manage this list manually or through another NYT endpoint
        return [
            'World', 'U.S.', 'Politics', 'N.Y.', 'Business', 'Opinion',
            'Tech', 'Science', 'Health', 'Sports', 'Arts', 'Books',
            'Style', 'Food', 'Travel', 'Magazine', 'T Magazine', 'Real Estate'
        ];
    }
}

