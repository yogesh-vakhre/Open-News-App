<!-- resources/views/news/sources.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>News Sources</title>
</head>
<body>
    <h1>News Sources</h1>
    <ul>
        @foreach($sources['sources'] as $source)
            <li>
                <strong>{{ $source['name'] }}</strong>
                <p>{{ $source['description'] }}</p>
                <a href="{{ $source['url'] }}">{{ $source['url'] }}</a>
            </li>
        @endforeach
    </ul>
</body>
</html>
