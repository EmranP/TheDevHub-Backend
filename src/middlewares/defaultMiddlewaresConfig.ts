import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'

export const defaultAppMiddleware = (
	app: Express,
	expressInstance: typeof express
): void => {
	// Устанавливаем HTTP заголовки для безопасности
	app.use(helmet())

	// Парсинг JSON
	app.use(expressInstance.json())

	// Настройка CORS
	app.use(
		cors({
			origin: 'http://localhost:5173',
			credentials: true,
		})
	)

	// Парсинг URL-кодированных данных
	app.use(
		expressInstance.urlencoded({
			extended: true,
		})
	)

	// Парсинг cookie
	app.use(cookieParser())

	// Глобальный обработчик ошибок
	app.use(
		(err: Error, req: Request, res: Response, next: NextFunction): void => {
			console.error(`[ERROR]: ${err.message}`)

			res.status(500).json({
				error: 'Internal Server Error',
				message: err.message,
			})
		}
	)
}
