import { Router } from 'express';
import { ProductDiscountController } from '../controllers/ProductDiscountController';

const discountRouter = Router();
const controller = new ProductDiscountController();

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Endpoints para aplicação, obtenção e remoção de descontos
 */

/**
 * @swagger
 * /products/with-discount:
 *   get:
 *     summary: Lista todos os descontos aplicados num produto
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: Lista de descontos ativos
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Nenhum desconto ativo para o produto informado
 *       500:
 *         description: Erro no servidor
 */
discountRouter.get('/products/with-discount/', controller.getDiscount);

/**
 * @swagger
 * /products/with-discounts:
 *   get:
 *     summary: Lista todos os desconto aplicado em produtos
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: Lista de descontos ativos
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Nenhum desconto ativo para o produto informado
 *       500:
 *         description: Erro no servidor
 */
discountRouter.get('/products/with-discounts/', controller.getDiscounts);

/**
 * @swagger
 * /products/{id}/discount/percent:
 *   post:
 *     summary: Aplica um desconto percentual direto ao produto
 *     tags: [Discounts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [percent]
 *             properties:
 *               percent:
 *                 type: number
 *                 example: 20
 *     responses:
 *       201:
 *         description: Desconto aplicado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Produto não encontrado
 *       409:
 *         description: Produto já possui desconto
 *       422:
 *         description: Valor final inválido (menor que R$ 0,01)
 *       500:
 *         description: Erro no servidor
 */
discountRouter.post('/products/:id/discount/percent', controller.applyPercent);

/**
 * @swagger
 * /products/{id}/discount/coupon:
 *   post:
 *     summary: Aplica um cupom de desconto ao produto
 *     tags: [Discounts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code]
 *             properties:
 *               code:
 *                 type: string
 *                 example: CUPOM10
 *     responses:
 *       201:
 *         description: Cupom aplicado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Cupom não encontrado ou Produto não encontrado
 *       409:
 *         description: Produto já possui desconto
 *       422:
 *         description: Valor final inválido (menor que R$ 0,01)
 *       500:
 *         description: Erro no servidor
 */
discountRouter.post('/products/:id/discount/coupon', controller.applyCoupon);

/**
 * @swagger
 * /products/{id}/discount:
 *   delete:
 *     summary: Remove desconto aplicado ao produto
 *     tags: [Discounts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Desconto removido com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Produto não possui desconto
 */
discountRouter.delete('/products/:id/discount', controller.remove);

export default discountRouter;
