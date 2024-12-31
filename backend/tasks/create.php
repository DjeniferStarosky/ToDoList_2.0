<?php
include_once '../db/connection.php';
include_once '../config/headers.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id) && !empty($data->description) && !empty($data->date_time)) {
    $query = "INSERT INTO tasks (user_id, description, date_time, important) VALUES (:user_id, :description, :date_time, :important)";
    $stmt = $pdo->prepare($query);

    $stmt->bindParam(':user_id', $data->user_id);
    $stmt->bindParam(':description', $data->description);
    $stmt->bindParam(':date_time', $data->date_time);
    $stmt->bindParam(':important', $data->important);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Tarefa criada com sucesso."]);
    } else {
        echo json_encode(["message" => "Erro ao criar tarefa."]);
    }
} else {
    echo json_encode(["message" => "Dados incompletos."]);
}
?>
