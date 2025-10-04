<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div
        class="flex flex-col items-center justify-between"
        x-data="{
            state: $wire.$entangle(@js($getStatePath())),
            selectedSeats: [],
            init() {
                // مقدار اولیه Livewire رو بریز تو selectedSeats
                this.selectedSeats = [...this.state];
            },
            toggleSeat(id) {
                if (this.selectedSeats.includes(id)) {
                    this.selectedSeats = this.selectedSeats.filter(x => x !== id);
                } else {
                    this.selectedSeats.push(id);
                }
                // بروزرسانی Livewire
                this.state = [...this.selectedSeats];
            }
        }"
        {{ $getExtraAttributeBag() }}
    >

        @foreach($getSeats() as $row => $groupSeats)
            <div class="flex items-center gap-1 mt-2">
                @foreach($groupSeats as $groupSeat)
                    <button
                        type="button"
                        x-id="['{{ 'seat-' .  $groupSeat['id'] }}']"
                        @click="toggleSeat({{ $groupSeat['id'] }})"
                        :class="selectedSeats.includes({{ $groupSeat['id'] }}) ? 'bg-green-500 text-white' : 'bg-gray-200'"
                        class="h-8 w-8 rounded border border-primary/60"
                    >
                        {{ $groupSeat['row'] . $groupSeat['number'] }}
                    </button>
                @endforeach
            </div>
        @endforeach

    </div>
</x-dynamic-component>
