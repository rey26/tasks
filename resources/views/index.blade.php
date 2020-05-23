<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Tasks</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
        <link href="./css/main.css" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="container">
            <header>Tasks
                <div id="more">
                    <a href="#" class="icon"><span class="material-icons">more_vert</span></a>
                    <div id="changeOrder" class="hidden" data-order="1">
                        <span class="material-icons">format_line_spacing</span>
                        <span>Spôsob zoradenia</span>
                    </div>
                </div>

            </header>
            <ul class="list-group" id="notDone"></ul>

            <ul class="list-group" id="done"></ul>

        </div>
        <footer class="container">
                <div id="formRoot"></div>
                <a id="newForm" href="#" class="button"><span class="material-icons">add</span></a>
            </footer>
        <script src="./js/app.js"></script>
    </body>
</html>
