import chalk from 'chalk'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
// Config & Middlewares
import { connectDB } from 'config/db'
import { defaultAppMiddleware } from 'middlewares/defaultMiddlewaresConfig'
// Routes
import routeAuthRegister from 'routes/user/register.route'
import routeAuthLogin from 'routes/user/login.route'
import routeAuthLogout from 'routes/user/logout.route'
import { authenticated } from 'middlewares/authenticated.middleware'
import routeUsers from 'routes/user/users.route'
import routeRoles from 'routes/user/roles.route'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4200

// Инициализация middleware
defaultAppMiddleware(app, express)

// Routes =================

// Auth
app.use('/api/auth', routeAuthRegister)
app.use('/api/auth', routeAuthLogin)
app.use('/api/auth', routeAuthLogout)

// Middleware Auth
app.use(authenticated)

// Users
app.use('/api/users', routeUsers)
app.use('/api/users/roles', routeRoles)

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
