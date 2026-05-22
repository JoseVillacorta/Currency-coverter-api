import { IsNumber, IsString, Length, Min } from "class-validator";

export class ConvertExchangeDto {
    @IsNumber()
    @Min(0.01)
    monto: number;

    @IsString()
    @Length(3, 3)
    monedaOrigen: string;

    @IsString()
    @Length(3, 3)
    monedaDestino: string;
}