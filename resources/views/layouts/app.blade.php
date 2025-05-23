<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="csrf-token" content='{{ csrf_token() }}'/>

    <title>{{ config('app.name') }}</title>

    <!-- Styles -->
    <link rel="shortcut icon" href="/favicon.png" type="image/png">
    @vite(['resources/css/app.css'])
</head>
<body>

    <div id="app"></div>

    @viteReactRefresh
    @vite(['resources/js/index.jsx'])
</body>
</html>
