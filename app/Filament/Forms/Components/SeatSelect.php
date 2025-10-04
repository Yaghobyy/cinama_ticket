<?php

namespace App\Filament\Forms\Components;

use Closure;
use Filament\Forms\Components\Field;

class SeatSelect extends Field
{
    protected string $view = 'filament.forms.components.seat-select';

    public $seats = [];

    public function seats(Closure | array $seats) : static
    {
        $this->seats = $seats;

        return $this;
    }

    public function getSeats() : array
    {
        return $this->evaluate($this->seats);
    }
}
