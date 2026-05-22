import { Body, Controller, Post } from '@nestjs/common';
import { ConvertExchangeDto } from './dto/convert-exchange.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
    constructor(private readonly exchangeService: ExchangeService) {}

    @Post('convert')
    convert(@Body() dto: ConvertExchangeDto) {
        return this.exchangeService.convert(dto);
    }
}
