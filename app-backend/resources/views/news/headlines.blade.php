<!-- resources/views/news/headlines.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Top Headlines</title>
</head>
<body>
    <h1>Top Headlines</h1>
    <ul>
        @foreach($headlines['articles'] as $article)
            <li>
                <a href="{{ $article['url'] }}">{{ $article['title'] }}</a>
                <p>{{ $article['description'] }}</p>
            </li>
        @endforeach
    </ul>
</body>
</html>
