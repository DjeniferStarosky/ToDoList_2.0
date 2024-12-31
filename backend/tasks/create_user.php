<?php
include_once '../db/connection.php';
include_once '../config/headers.php';

// Receber dados do corpo da requisição
$data = json_decode(file_get_contents("php://input"));

// Verificar se os dados necessários foram passados
if (!empty($data->username) && !empty($data->password)) {
    // Hash da senha para segurança
    $hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);

    // SQL para inserir o novo usuário
    $query = "INSERT INTO users (username, password, created_at) VALUES (:username, :password, NOW())";

    // Preparar a consulta
    $stmt = $pdo->prepare($query);

    // Bind dos parâmetros
    $stmt->bindParam(':username', $data->username);
    $stmt->bindParam(':password', $hashedPassword);

    // Tentar executar a consulta
    try {
        if ($stmt->execute()) {
            echo json_encode(["message" => "Usuário cadastrado com sucesso."]);
        } else {
            echo json_encode(["message" => "Erro ao cadastrar usuário."]);
        }
    } catch (PDOException $e) {
        // Verificar se o erro é de chave única duplicada
        if ($e->getCode() == 23000) { // Código de erro para violação de chave única
            echo json_encode(["message" => "Nome de usuário já está em uso. Escolha outro."]);
        } else {
            echo json_encode(["message" => "Erro no banco de dados: " . $e->getMessage()]);
        }
    }
} else {
    echo json_encode(["message" => "Dados incompletos."]);
}
?>
