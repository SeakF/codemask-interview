import { 
	ArgumentMetadata, 
	BadRequestException, 
	Injectable,
	PipeTransform 
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';


@Injectable()
export class MedalsValidationPipe implements PipeTransform {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToInstance(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			throw new BadRequestException('Validation failed');
		}

		if (value && (
			value.country ||
			Array.isArray(value) && value.every(item => typeof item.country === 'string' )
		)) {
			const transformCountryToUppercase = (obj: any) => {
				if (typeof obj === 'object' && obj !== null && obj.country) {
					obj.country = obj.country.toUpperCase();
				} else if (Array.isArray(obj) ) {
					obj.forEach(transformCountryToUppercase);
				}
			};

			transformCountryToUppercase(value)
		}

		return value;
	}
	
	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
