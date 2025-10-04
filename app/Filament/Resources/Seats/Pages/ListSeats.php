<?php

namespace App\Filament\Resources\Seats\Pages;

use App\Filament\Resources\Seats\SeatResource;
use App\Models\Seat;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

class ListSeats extends ListRecords
{
    protected static string $resource = SeatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        $tabs = [
            'همه' => Tab::make(),
        ];

        $rows = Seat::query()
            ->select('row')
            ->distinct()
            ->orderBy('row')
            ->pluck('row')
            ->all();

        foreach ($rows as $row) {
            $label = strtoupper($row);
            $tabs[$label] = Tab::make()
                ->modifyQueryUsing(fn (Builder $query) => $query->where('row', $label));
        }

        return $tabs;
    }

    
}
