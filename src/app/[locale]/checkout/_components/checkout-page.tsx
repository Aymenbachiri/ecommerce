"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { CreditCard, MapPin, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCheckout } from "../_lib/use-checkout";

export function CheckoutPage(): React.JSX.Element {
  const {
    cart,
    total,
    loading,
    customerInfo,
    paymentInfo,
    handleSubmit,
    t,
    setCustomerInfo,
    setPaymentInfo,
    router,
  } = useCheckout();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {cart.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-8 text-3xl font-bold">{t("checkoutTitle")}</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {t("customerInformation")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <section>
                        <Label htmlFor="name" className="mb-2">
                          {t("fullName")}
                        </Label>
                        <Input
                          id="name"
                          required
                          value={customerInfo.name}
                          placeholder={t("enterFullName")}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              name: e.target.value,
                            })
                          }
                        />
                      </section>
                      <section>
                        <Label htmlFor="email" className="mb-2">
                          {t("email")}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={customerInfo.email}
                          placeholder={t("enterEmail")}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              email: e.target.value,
                            })
                          }
                        />
                      </section>
                    </div>
                    <section>
                      <Label htmlFor="phone" className="mb-2">
                        {t("phoneNumber")}
                      </Label>
                      <Input
                        id="phone"
                        required
                        value={customerInfo.phone}
                        placeholder={t("enterPhoneNumber")}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value,
                          })
                        }
                      />
                    </section>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {t("shippingAddress")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <section>
                      <Label htmlFor="street" className="mb-2">
                        {t("streetAddress")}
                      </Label>
                      <Textarea
                        id="street"
                        required
                        value={customerInfo.address.street}
                        placeholder={t("enterStreetAddress")}
                        className="resize-none"
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            address: {
                              ...customerInfo.address,
                              street: e.target.value,
                            },
                          })
                        }
                      />
                    </section>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <section>
                        <Label htmlFor="city" className="mb-2">
                          {t("city")}
                        </Label>
                        <Input
                          id="city"
                          required
                          value={customerInfo.address.city}
                          placeholder={t("enterCity")}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              address: {
                                ...customerInfo.address,
                                city: e.target.value,
                              },
                            })
                          }
                        />
                      </section>
                      <section>
                        <Label htmlFor="state" className="mb-2">
                          {t("state")}
                        </Label>
                        <Input
                          id="state"
                          required
                          value={customerInfo.address.state}
                          placeholder={t("enterState")}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              address: {
                                ...customerInfo.address,
                                state: e.target.value,
                              },
                            })
                          }
                        />
                      </section>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <section>
                        <Label htmlFor="zipCode" className="mb-2">
                          {t("zipCode")}
                        </Label>
                        <Input
                          id="zipCode"
                          required
                          value={customerInfo.address.zipCode}
                          placeholder={t("enterZipCode")}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              address: {
                                ...customerInfo.address,
                                zipCode: e.target.value,
                              },
                            })
                          }
                        />
                      </section>
                      <section>
                        <Label htmlFor="country" className="mb-2">
                          {t("country")}
                        </Label>
                        <Input
                          id="country"
                          required
                          value={customerInfo.address.country}
                          placeholder={t("enterCountry")}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              address: {
                                ...customerInfo.address,
                                country: e.target.value,
                              },
                            })
                          }
                        />
                      </section>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      {t("paymentInformation")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <section>
                      <Label htmlFor="cardholderName" className="mb-2">
                        {t("cardholderName")}
                      </Label>
                      <Input
                        id="cardholderName"
                        required
                        value={paymentInfo.cardholderName}
                        placeholder={t("enterCardholderName")}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardholderName: e.target.value,
                          })
                        }
                      />
                    </section>
                    <section>
                      <Label htmlFor="cardNumber" className="mb-2">
                        {t("cardNumber")}
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardNumber: e.target.value,
                          })
                        }
                      />
                    </section>
                    <div className="grid grid-cols-2 gap-4">
                      <section>
                        <Label htmlFor="expiryDate" className="mb-2">
                          {t("expiryDate")}
                        </Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          required
                          value={paymentInfo.expiryDate}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              expiryDate: e.target.value,
                            })
                          }
                        />
                      </section>
                      <section>
                        <Label htmlFor="cvv" className="mb-2">
                          {t("cvv")}
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cvv: e.target.value,
                            })
                          }
                        />
                      </section>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>{t("orderSummary")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <section
                          key={item.product.id}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.product.name} × {item.quantity}
                          </span>
                          <span>
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </section>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <section className="flex justify-between">
                        <span>{t("subtotal")}</span>
                        <span>${total.toFixed(2)}</span>
                      </section>
                      <section className="flex justify-between">
                        <span>{t("shipping")}</span>
                        <span>{t("free")}</span>
                      </section>
                      <section className="flex justify-between">
                        <span>{t("tax")}</span>
                        <span>${(total * 0.1).toFixed(2)}</span>
                      </section>
                    </div>

                    <Separator />

                    <section className="flex justify-between text-lg font-semibold">
                      <span>{t("total")}</span>
                      <span>${(total * 1.1).toFixed(2)}</span>
                    </section>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? t("processing") : t("placeOrder")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="mx-auto max-w-5xl px-4 py-8">
          <section className="py-16 text-center">
            <h1 className="mb-4 text-3xl font-bold">{t("cartEmptyTitle")}</h1>
            <p className="text-muted-foreground mb-8">
              {t("cartEmptyMessage")}
            </p>
            <Button size="lg" onClick={() => router.push("/products")}>
              {t("startShopping")}
            </Button>
          </section>
        </div>
      )}
    </div>
  );
}
