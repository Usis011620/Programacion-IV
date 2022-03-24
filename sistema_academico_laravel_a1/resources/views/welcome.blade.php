<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">::..SISTEMA ACADEMICO --UGB..::</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link"href="#">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Alumnos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Docentes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Materias</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Matricula</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Inscripcion</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Notas</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>