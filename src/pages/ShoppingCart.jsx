import Header from "../components/layout/header" 
import Footer from "../components/layout/footer" 
import AIChat from "../components/AI/AiChat" 
import ShoppingCartMain from "../components/cart/shopping_cart" 

function ShoppingCartPage() {
  return (
    <>
      <Header />
      <main>
        <ShoppingCartMain />
      </main>
      <Footer />
      <AIChat />
    </>
  )
}

export default ShoppingCartPage
