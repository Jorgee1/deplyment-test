import Fastify from "fastify"
import { fastifyCors } from '@fastify/cors'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { appRouter, AppRouter } from './trpc'


const fastify = Fastify()
fastify.register(fastifyTRPCPlugin<AppRouter>, {
    prefix: '/trpc',
    trpcOptions: {
        router: appRouter
    }
})
fastify.register(fastifyCors, {
    origin: true
})

fastify.get('/test', () => ({ hey: 'response' }))

const main = async () => {
    await fastify.listen({ port:3000 })
}
main()
