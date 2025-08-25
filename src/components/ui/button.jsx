export function Button({ className = '', size = 'md', variant = 'solid', ...props }) {
  const sizes = { md:'h-10 px-4 text-sm', lg:'h-12 px-6 text-base' }
  const variants = { solid:'bg-black text-white hover:opacity-90', outline:'border border-gray-200 text-gray-700 hover:bg-gray-50' }
  const base = 'inline-flex items-center justify-center rounded-2xl transition active:scale-[0.99] focus:outline-none'
  return <button className={[base, sizes[size], variants[variant], className].join(' ')} {...props} />
}
