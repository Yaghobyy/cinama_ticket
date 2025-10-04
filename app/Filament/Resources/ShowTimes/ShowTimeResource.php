<?php

namespace App\Filament\Resources\ShowTimes;

use App\Filament\Resources\ShowTimes\Pages\CreateShowTime;
use App\Filament\Resources\ShowTimes\Pages\EditShowTime;
use App\Filament\Resources\ShowTimes\Pages\ListShowTimes;
use App\Filament\Resources\ShowTimes\Schemas\ShowTimeForm;
use App\Filament\Resources\ShowTimes\Tables\ShowTimesTable;
use App\Models\ShowTime;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ShowTimeResource extends Resource
{
    protected static ?string $model = ShowTime::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $modelLabel = 'سانس';
    protected static ?string $pluralModelLabel = 'سانس ها';
    
    public static function form(Schema $schema): Schema
    {
        return ShowTimeForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ShowTimesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListShowTimes::route('/'),
            'create' => CreateShowTime::route('/create'),
            'edit' => EditShowTime::route('/{record}/edit'),
        ];
    }
}
