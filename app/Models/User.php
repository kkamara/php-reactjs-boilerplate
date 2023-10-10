<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Soved\Laravel\Gdpr\Portable;
use Soved\Laravel\Gdpr\Contracts\Portable as PortableContract;
use Soved\Laravel\Gdpr\EncryptsAttributes;
use Soved\Laravel\Gdpr\Retentionable;

class User extends Authenticatable implements PortableContract
{
    use HasApiTokens, HasFactory, Notifiable, Portable; 
    use EncryptsAttributes, Retentionable;

    /**
     * The attributes that should be visible in the downloadable data.
     *
     * @var array
     */
    protected $gdprVisible = [
        'first_name', 
        'last_name', 
        'email',
        'created_at',
    ];
    
    /**
     * The attributes that should be encrypted and decrypted on the fly.
     *
     * @var array
     */
    protected $encrypted = [];

    /**
     * The relations to include in the downloadable data.
     *
     * @var array
     */
    protected $gdprWith = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
