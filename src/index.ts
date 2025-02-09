import chalk from 'chalk'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
// Config & Middlewares
import { connectDB } from 'config/db'
import { defaultAppMiddleware } from 'middlewares/defaultMiddlewaresConfig'
import router from 'routes/index.route'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 4200

// Инициализация middleware
defaultAppMiddleware(app, express)

// Routes =================
app.use('/', router)


// Глобальный обработчик ошибок
app.use((err: Error, req: Request, res: Response, next:NextFunction): void => {
	console.error(`[ERROR]: ${err.message}`)
	res.status(500).json({
			error: 'Internal Server Error',
			message: err.message,
		})
	}
)


// Start Server ===========

const startApp = async (): Promise<void> => {
	try {
		// Подключение к базе данных
		await connectDB()

		// Запуск сервера
		app.listen(PORT, () => {
			console.log(chalk.yellow(`🚀 Сервер запущен на http://localhost:${PORT}`))
		})
	} catch (error) {
		console.error(chalk.red('❌ Ошибка запуска сервера:'), error)
		process.exit(1)
	}
}

startApp()
