<?php
include_once '../db/connection.php';
include_once '../config/headers.php';

// Receber os dados de login 
$data = json_decode(file_get_contents("php://input"));

// Verificar se os dados de username e password foram fornecidos
if (!empty($data->username) && !empty($data->password)) {
    // SQL para verificar se o usuário existe com o username fornecido
    $query = "SELECT id, username, password FROM users WHERE username = :username LIMIT 1";

    // Preparar a consulta
    $stmt = $pdo->prepare($query);

    // Bind do parâmetro
    $stmt->bindParam(':username', $data->username, PDO::PARAM_STR);

    try {
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar se o usuário foi encontrado
        if ($user) {
            // Verificar se a senha fornecida corresponde à senha armazenada (senha criptografada)
            if (password_verify($data->password, $user['password'])) {
               // Senha correta, gera um token aleatório
                $token = bin2hex(random_bytes(16)); 
                // Retorna os dados do usuário (com id)
                echo json_encode([
                    "message" => "Login bem-sucedido.",
                    "user_id" => $user['id'],
                    "username" => $user['username']
                ]);
            } else {
                echo json_encode(["message" => "Senha incorreta."]);
            }
        } else {
            echo json_encode(["message" => "Usuário não encontrado."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro no banco de dados: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Username e senha são obrigatórios."]);
}
?>
