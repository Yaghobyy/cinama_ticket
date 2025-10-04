<?php

namespace App\Filament\Resources\Reservations\Pages;

use App\Filament\Resources\Reservations\ReservationResource;
use App\Models\ShowTime;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditReservation extends EditRecord
{
    protected static string $resource = ReservationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
   

    protected function mutateFormDataBeforeFill(array $data): array
        {
            $showTime = ShowTime::find($data['show_time_id']);
            

            $data['movie_id'] = $showTime->movie_id;

            return $data;
        }
}
