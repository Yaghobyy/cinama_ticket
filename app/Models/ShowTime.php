<?php

namespace App\Models;

use Hekmatinasser\Verta\Facades\Verta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;

class ShowTime extends Model
{
    
    protected $guarded = ['id'];

    protected $appends = [
        'title'
    ];

    public function getTitleAttribute()
    {
        return 
            verta($this->show_date)->format('Y/m/d') . ' -> '.
            Carbon::parse($this->start_time)->format('H:i')
            . '-' . Carbon::parse($this->end_time)->format('H:i');
    }

    public function movie() : BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }

    public function reservations() : HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
