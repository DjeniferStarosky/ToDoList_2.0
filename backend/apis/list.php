<?php
require_once('../config/headers.php');
require_once('../db/connection.php');

// Obtendo o tipo de listagem da consulta (default: 'minha-lista')
$listType = isset($_GET['type']) ? $_GET['type'] : 'minha-lista';

// Obtendo o ID do usuário logado
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

// Verificação básica do ID do usuário
if ($user_id <= 0) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'ID do usuário inválido ou não fornecido.']);
    exit;
}


// Obtendo a data atual
$timezone = isset($_GET['timezone']) ? $_GET['timezone'] : 'America/Sao_Paulo';
date_default_timezone_set($timezone);
$currentDate = date('Y-m-d');


// SQL base para listar tarefas
$sql = "SELECT * FROM tasks WHERE status = 'pendente' AND user_id = :user_id";

// Filtrando conforme o tipo de listagem
switch ($listType) {
    case 'meu-dia':
        $sql .= " AND DATE(date_time) = :currentDate";
        break;
    case 'importante':
        $sql .= " AND important = 1 AND DATE(date_time) >= :currentDate";
        break;
    case 'atrasadas':
        $sql .= " AND DATE(date_time) < :currentDate";
        break;
    case 'minha-lista':
    default:
        $sql .= " AND DATE(date_time) >= :currentDate";
        break;
}

// Preparar a consulta
$stmt = $pdo->prepare($sql);

// Adicionando os parâmetros
$stmt->bindValue(':user_id', $user_id);
$stmt->bindValue(':currentDate', $currentDate);

// Executar e obter resultados
$stmt->execute();
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Retornar os resultados como JSON
header('Content-Type: application/json');
echo json_encode($tasks);
?>
