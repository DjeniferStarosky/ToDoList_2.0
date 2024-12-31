<?php
include_once '../db/connection.php';
include_once '../config/headers.php';

// Receber dados do corpo da requisição (usando JSON)
$data = json_decode(file_get_contents("php://input"));

// Verificar se os dados necessários foram passados e monta SQL para atualizar a tarefa
if (!empty($data->id) && isset($data->important) && isset($data->status)) {
    $query = "UPDATE tasks SET important = :important, status = :status WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $data->id);
    $stmt->bindParam(':important', $data->important);
    $stmt->bindParam(':status', $data->status);

    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Tarefa atualizada com sucesso."]);
    } else {
        echo json_encode(["message" => "Erro ao atualizar tarefa."]);
    }
} else {
    echo json_encode(["message" => "Dados incompletos."]);
}
?>
