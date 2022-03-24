<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
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
</body>

</html>