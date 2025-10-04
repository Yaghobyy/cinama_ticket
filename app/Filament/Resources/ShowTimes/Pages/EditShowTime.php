<?php

namespace App\Filament\Resources\ShowTimes\Pages;

use App\Filament\Resources\ShowTimes\ShowTimeResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditShowTime extends EditRecord
{
    protected static string $resource = ShowTimeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
