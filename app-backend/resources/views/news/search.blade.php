
<!-- resources/views/news/search.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Search Results</title>
</head>
<body>
    <h1>Search Results</h1>
    <ul>
        @foreach($results['articles'] as $article)
            <li>
                <a href="{{ $article['url'] }}">{{ $article['title'] }}</a>
                <p>{{ $article['description'] }}</p>
            </li>
        @endforeach
    </ul>
</body>
</html>
