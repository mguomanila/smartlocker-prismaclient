import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient
export const router = Router()

router.get('/lockertimelimit/:id', async (req, res, next) => {
	const { id } = req.params
	const { lockerTimeLimit } = prisma
	async function main(){
		return await lockerTimeLimit.findFirst()
	}
	const query = await main()
	res.json(query)
})

router.get('/user', async (req, res, next) => {
	async function main(){
		const { user } = prisma
		return await user.findFirst()
	}
	const user = await main()
	res.json(user)
})
