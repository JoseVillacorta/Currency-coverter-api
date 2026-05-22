import { BadRequestException, Injectable } from '@nestjs/common';
import { ConvertExchangeDto } from './dto/convert-exchange.dto';
import { ExchangeResult } from './interfaces/exchange-result-interface';

@Injectable()
export class ExchangeService {
    /** Tasa directas: 1 unidad de origen = X unidades de destino */
    private rates: Record<string, number> = {
        'USD-PEN': 3.75,
        'PEN-USD': 0.27,
        'USD-EUR': 0.92,
        'EUR-USD': 1.09,
        'PEN-EUR': 0.25,
        'EUR-PEN': 4.00,
    };

    convert(dto: ConvertExchangeDto): ExchangeResult {
        const monedaOrigen = dto.monedaOrigen.toUpperCase();
        const monedaDestino = dto.monedaDestino.toUpperCase();
        const tipoDeCambio = this.getRate(monedaOrigen, monedaDestino);

        return {
            monto: dto.monto,
            montoConTipoDeCambio: Number((dto.monto * tipoDeCambio).toFixed(4)),
            monedaOrigen,
            monedaDestino,
            tipoDeCambio,
        };
    }

    getRate(origen: string, destino: string): number {
        if(origen == destino) {
            return 1;
        }

        const key = `${origen}-${destino}`;
        const rate = this.rates[key];

        if(rate == undefined) {
            throw new BadRequestException(
                `No existe tipo de cambio para ${origen} → ${destino}`,
            );
        }
        return rate;
    }

}
