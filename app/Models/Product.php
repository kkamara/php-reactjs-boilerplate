<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use SoftDeletes, HasFactory;

    /**
     * This models immutable values.
     *
     * @property Array
     */
    protected $guarded = [];

    /**
     * This models immutable date values.
     *
     * @property Array
     */
    protected $casts = ['deleted_at' => 'datetime',];

    /**
     * Query products using request params.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $query
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function scopeGetProducts($query) {
        return $query->orderByDesc('products.id')
            ->groupBy('products.id')
            ->distinct();
    }
}
