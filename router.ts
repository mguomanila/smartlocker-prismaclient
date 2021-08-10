import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient
export const router = Router()

router.get('/lockertimelimits/:id', async (req, res, next) => {
	const { id } = req.params
	async function main(){
		return await prisma.user.findMany({ })
	}
	const query = await main()
	res.json(query)
})
