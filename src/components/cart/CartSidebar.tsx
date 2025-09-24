'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { RippleButton } from '@/components/magicui/ripple-button'
import { formatPrice } from '@/lib/utils'
import {
  XMarkIcon,
  ShoppingBagIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline'

export default function CartSidebar() {
  const { state, closeCart, removeItem, updateQuantity } = useCart()

  return (
    <Transition.Root show={state.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          עגלת קניות
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={closeCart}
                          >
                            <span className="sr-only">סגור עגלה</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {state.items.length === 0 ? (
                            <div className="text-center py-16">
                              <ShoppingBagIcon className="mx-auto h-16 w-16 text-gray-300" />
                              <h3 className="mt-4 text-lg font-medium text-gray-900">
                                העגלה ריקה
                              </h3>
                              <p className="mt-2 text-gray-500">
                                הוסיפו מוצרים כדי להתחיל לקנות
                              </p>
                              <div className="mt-6">
                                <Link href="/products">
                                  <RippleButton
                                    onClick={closeCart}
                                    className="bg-primary-600 text-white px-6 py-3 font-medium"
                                    style={{ borderRadius: '25px 0 25px 0' }}
                                  >
                                    המשך קנייה
                                  </RippleButton>
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {state.items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      width={96}
                                      height={96}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link href={`/products/${item.slug}`} onClick={closeCart}>
                                            {item.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          {formatPrice((item.sale_price || item.price) * item.quantity)}
                                        </p>
                                      </div>
                                      {item.sale_price && (
                                        <p className="text-sm text-gray-500 line-through">
                                          {formatPrice(item.price * item.quantity)}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center gap-2">
                                        <span className="text-gray-500">כמות:</span>
                                        <div className="flex items-center border border-gray-300 rounded">
                                          <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 text-gray-500 hover:text-gray-700"
                                          >
                                            <MinusIcon className="h-4 w-4" />
                                          </button>
                                          <span className="px-2 py-1 text-gray-900 min-w-[2rem] text-center">
                                            {item.quantity}
                                          </span>
                                          <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock_quantity}
                                            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                          >
                                            <PlusIcon className="h-4 w-4" />
                                          </button>
                                        </div>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => removeItem(item.id)}
                                          className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                        >
                                          <TrashIcon className="h-4 w-4" />
                                          הסר
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {state.items.length > 0 && (
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>סה״כ</p>
                          <p>{formatPrice(state.total)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          משלוח והמסים יחושבו בתשלום
                        </p>
                        <div className="mt-6">
                          <Link href="/checkout">
                            <RippleButton
                              onClick={closeCart}
                              className="w-full bg-primary-600 text-white py-3 font-medium shadow-lg"
                              style={{ borderRadius: '25px 0 25px 0' }}
                            >
                              המשך לתשלום
                            </RippleButton>
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            או{' '}
                            <button
                              type="button"
                              className="font-medium text-primary-600 hover:text-primary-500"
                              onClick={closeCart}
                            >
                              המשך קנייה
                              <span aria-hidden="true"> &larr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
