<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = App\Models\User::where('email', 'admin@example.com')->with('role')->first();

if (! $user) {
    echo "admin user not found\n";
    exit(1);
}

print_r($user->toArray());

if ($user->role) {
    echo "role present: ";
    print_r($user->role->toArray());
} else {
    echo "role relation is null\n";
}
