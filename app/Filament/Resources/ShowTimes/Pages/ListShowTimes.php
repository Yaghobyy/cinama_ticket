<?php

namespace App\Filament\Resources\ShowTimes\Pages;

use App\Filament\Resources\ShowTimes\ShowTimeResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListShowTimes extends ListRecords
{
    protected static string $resource = ShowTimeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
