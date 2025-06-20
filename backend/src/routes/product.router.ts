import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const productRouter = Router();
const controller = new ProductController();

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Endpoints para gerenciamento de produtos
 * 
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, stock]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Notebook Dell
 *               description:
 *                 type: string
 *                 example: Notebook potente
 *               price:
 *                 type: number
 *                 example: 3500.5
 *               stock:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: notebook dell
 *                 description:
 *                   type: string
 *                   example: notebook potente
 *                 price:
 *                   type: number
 *                   example: 3500.5
 *                 stock:
 *                   type: integer
 *                   example: 10
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-06-18T12:00:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *       409:
 *         description: Produto com mesmo nome já existe
 */
productRouter.post('/', controller.create);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
productRouter.get('/', controller.list);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtém um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
productRouter.get('/:id', controller.getById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 */
productRouter.put('/:id', controller.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove (soft delete) um produto
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do produto
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto deletado
 *       404:
 *         description: Produto não encontrado
 */
productRouter.delete('/:id', controller.softDelete);

/**
 * @swagger
 * /products/{id}/restore:
 *   patch:
 *     summary: Restaura um produto deletado
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do produto
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto restaurado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
productRouter.post('/:id/restore', controller.restore);

export default productRouter;