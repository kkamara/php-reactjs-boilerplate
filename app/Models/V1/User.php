<?php

namespace App\Models\V1;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Traits\Tappable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory, Notifiable;
    use Tappable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "first_name",
        "last_name",
        "email",
        "password",
        "avatar_name",
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        "password",
        "remember_token",
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            "email_verified_at" => "datetime",
            "password" => "hashed",
        ];
    }

    public function setCreatedAtAttribute(mixed $value): void
    {
        if ($value === null) {
            $this->attributes['created_at'] = null;

            return;
        }

        $this->attributes['created_at'] = Carbon::parse($value)
            ->utc()
            ->toDateTimeString();
    }

    public function setUpdatedAtAttribute(mixed $value): void
    {
        if ($value === null) {
            $this->attributes['updated_at'] = null;

            return;
        }

        $this->attributes['updated_at'] = Carbon::parse($value)
            ->utc()
            ->toDateTimeString();
    }

    public function getAvatarPath(): string
    {
        return $this->avatar_name ?
            config('app.url')."/storage/images/profile/".$this->avatar_name :
            config('app.url')."/storage/images/profile/default-avatar.webp";
    }
}
