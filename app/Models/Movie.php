<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
    
    protected $guarded = ['id'];

    protected $appends = ['poster_url'];

    protected function posterUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->poster ? asset('storage/' . $this->poster) : null);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function artists()
    {
        return $this->belongsToMany(Artist::class);
    }

    public function showTimes() : HasMany
    {
        return $this->hasMany(ShowTime::class);
    }
}
