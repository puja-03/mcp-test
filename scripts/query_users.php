<?php
$path = __DIR__ . '/../database/database.sqlite';
if (! file_exists($path)) {
    echo "sqlite file not found: $path\n";
    exit(1);
}
try {
    $pdo = new PDO('sqlite:' . $path);
    $stmt = $pdo->query('SELECT id, email, role_id FROM users');
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($rows as $r) {
        echo "id={$r['id']} email={$r['email']} role_id={$r['role_id']}\n";
    }
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "\n";
    exit(1);
}
