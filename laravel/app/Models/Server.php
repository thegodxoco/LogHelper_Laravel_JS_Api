<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Server extends Model
{
    use HasFactory;

    protected $fillable = [
        'ipv4',
        'ipv6',
        'location',
        'description',
    ];

    public function logs()
    {
        return $this->hasMany(Log::class);
    }
}
