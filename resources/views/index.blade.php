<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Tasks</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
        <link href="./css/main.css" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="container">
            <header>Tasks
                <a href="#" class="btn btn-primary">more</a>
            </header>
            <ul class="list-group" id="notDone"></ul>

            <ul class="list-group" id="done"></ul>
            <footer>
                <div id="formRoot"></div>
                <a id="newForm" href="#" class="btn btn-success">New</a>
            </footer>
        </div>
        <script src="./js/app.js"></script>
    </body>
</html>
