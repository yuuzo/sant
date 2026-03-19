import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  Search, 
  Eye, 
  EyeOff, 
  Bell, 
  Info, 
  ChevronRight, 
  ChevronLeft, 
  RefreshCw, 
  Calendar,
  Share2,
  X,
  CreditCard,
  MessageSquare,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Smartphone,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import santanderLogo from './assets/santander_logo.png';
import pixIcon from './assets/pix.png';
import emprestimosIcon from './assets/emprestimos.png';
import dindinIcon from './assets/dindin.png';
import maisAcoesIcon from './assets/mais acoes rapidas.png';
import inicioIcon from './assets/inicio.png';
import pagarIcon from './assets/pagar.png';
import cartoesIcon from './assets/cartoes.png';
import chatIcon from './assets/chat.png';

// Mock Data
const TRANSACTIONS = [
  { id: 1, type: 'income', title: 'Resg poup - central/internet/app', subtitle: 'De: 2045.60.015997-8', amount: 1500.00, date: 'Hoje', icon: 'blue' },
  { id: 2, type: 'expense', title: 'Compra cartao deb mc', subtitle: '18/03 99. pop 18mar 15h06', amount: -10.45, date: 'Hoje', icon: 'orange' },
  { id: 3, type: 'expense', title: 'Pagamento de boleto outros bancos', subtitle: 'Portoseg sa c financ e in', amount: -409.74, date: 'Hoje', icon: 'orange' },
  { id: 4, type: 'expense', title: 'Pix enviado', subtitle: 'Facebook servicos online', amount: -12.52, date: 'Terça, 17 de março', icon: 'orange' },
  { id: 5, type: 'expense', title: 'Debito aut. telefone celular', subtitle: 'Vivo movel-sp', amount: -70.00, date: 'Terça, 17 de março', icon: 'orange' },
  { id: 6, type: 'expense', title: 'Compra cartao deb mc', subtitle: '16/03 paskel lanchonete', amount: -15.00, date: 'Segunda, 16 de março', icon: 'orange' },
  { id: 7, type: 'expense', title: 'Pagamento de boleto outros bancos', subtitle: 'Victornet telecomunicacao', amount: -99.90, date: 'Segunda, 16 de março', icon: 'orange' },
  { id: 8, type: 'expense', title: 'Pix enviado', subtitle: 'N f r machine diversoes c', amount: -15.00, date: 'Segunda, 16 de março', icon: 'orange' },
  { id: 9, type: 'expense', title: 'Pix enviado', subtitle: 'Aac padaria tradicao ltda', amount: -14.00, date: 'Segunda, 16 de março', icon: 'orange' },
  { id: 10, type: 'expense', title: 'Transferencia para conta poupanca', subtitle: 'Para: 2045.60.015997-8', amount: -370.00, date: 'Terça, 10 de março', icon: 'orange' },
  { id: 11, type: 'expense', title: 'Pagamento de boleto outros bancos', subtitle: 'Residencial estacao parai', amount: -540.20, date: 'Terça, 10 de março', icon: 'orange' },
  { id: 12, type: 'income', title: 'Pix recebido', subtitle: 'Neusa nascimento soares', amount: 1000.00, date: 'Terça, 10 de março', icon: 'blue' },
  { id: 13, type: 'expense', title: 'Compra cartao deb mc', subtitle: '08/03 bicho feliz play', amount: -6.00, date: 'Segunda, 9 de março', icon: 'orange' },
  { id: 14, type: 'expense', title: 'Compra cartao deb mc', subtitle: '08/03 shopping itaquera l', amount: -15.00, date: 'Segunda, 9 de março', icon: 'orange' },
  { id: 15, type: 'expense', title: 'Compra cartao deb mc', subtitle: '06/03 uber uber .trip hel', amount: -8.02, date: 'Sexta, 6 de março', icon: 'orange' },
  { id: 16, type: 'expense', title: 'Compra cartao deb mc', subtitle: '06/03 uber uber .trip hel', amount: -9.96, date: 'Sexta, 6 de março', icon: 'orange' },
  { id: 17, type: 'expense', title: 'Juros saldo utiliz ate limite', subtitle: 'Periodo: 05/02 a 04/03/26', amount: -14.01, date: 'Quinta, 5 de março', icon: 'orange' },
  { id: 18, type: 'expense', title: 'Seguro cheque protegido', subtitle: 'Periodo: 05/02 a 04/03/26', amount: -3.17, date: 'Quinta, 5 de março', icon: 'orange' },
  { id: 19, type: 'income', title: 'Pix recebido', subtitle: 'Wagner rodrigues dos sant', amount: 216.00, date: 'Quinta, 5 de março', icon: 'blue' },
  { id: 20, type: 'expense', title: 'Pagamento cartao credito bce', subtitle: '05/03 19:40 cartao master', amount: -2172.88, date: 'Quinta, 5 de março', icon: 'orange' },
  { id: 21, type: 'income', title: 'Resg poup - central/internet/app', subtitle: 'De: 2045.60.015997-8', amount: 1600.00, date: 'Quinta, 5 de março', icon: 'blue' },
  { id: 22, type: 'income', title: 'Pix recebido', subtitle: 'Irani cardosina morais', amount: 223.00, date: 'Quinta, 5 de março', icon: 'blue' },
  { id: 23, type: 'expense', title: 'Compra cartao deb mc', subtitle: '05/03 uber uber .trip hel', amount: -12.96, date: 'Quinta, 5 de março', icon: 'orange' },
  { id: 24, type: 'income', title: 'Remuneracao aplicacao automatica', subtitle: '', amount: 0.01, date: 'Quarta, 4 de março', icon: 'blue' },
  { id: 25, type: 'expense', title: 'Pix enviado', subtitle: 'Edp sao paulo distribuica', amount: -180.01, date: 'Quarta, 4 de março', icon: 'orange' },
  { id: 26, type: 'expense', title: 'Pix enviado', subtitle: 'Edp sao paulo distribuica', amount: -218.36, date: 'Quarta, 4 de março', icon: 'orange' },
  { id: 27, type: 'expense', title: 'Transferencia programada', subtitle: 'Para: 2045.60.015997-8', amount: -1000.00, date: 'Terça, 3 de março', icon: 'orange' },
  { id: 28, type: 'expense', title: 'Compra cartao deb mc', subtitle: '03/03 panificadora tradic', amount: -11.00, date: 'Terça, 3 de março', icon: 'orange' },
  { id: 29, type: 'income', title: 'Pix recebido', subtitle: 'Viviane aparecida dos san', amount: 800.00, date: 'Terça, 3 de março', icon: 'blue' },
  { id: 30, type: 'expense', title: 'Pix enviado', subtitle: 'Fabiano araujo barbosa', amount: -583.25, date: 'Terça, 3 de março', icon: 'orange' },
  { id: 31, type: 'income', title: 'Pix recebido', subtitle: 'Patricia c p felix', amount: 443.68, date: 'Terça, 3 de março', icon: 'blue' },
  { id: 32, type: 'expense', title: 'Iof adicional - automatico', subtitle: 'Periodo: 01/02 a 28/02/26', amount: -2.79, date: 'Segunda, 2 de março', icon: 'orange' },
  { id: 33, type: 'expense', title: 'Iof imposto operacoes financeiras', subtitle: 'Periodo: 01/02 a 28/02/26', amount: -0.52, date: 'Segunda, 2 de março', icon: 'orange' },
  { id: 34, type: 'income', title: 'Pix recebido', subtitle: 'Daiane santos miranda', amount: 295.00, date: 'Segunda, 2 de março', icon: 'blue' },
  { id: 35, type: 'expense', title: 'Compra cartao deb mc', subtitle: '27/02 panificadora tradic', amount: -8.00, date: 'Sexta, 27 de fevereiro', icon: 'orange' },
  { id: 36, type: 'expense', title: 'Compra cartao deb mc', subtitle: '27/02 panificadora tradic', amount: -6.00, date: 'Sexta, 27 de fevereiro', icon: 'orange' },
  { id: 37, type: 'expense', title: 'Pix enviado', subtitle: 'Daiane santos miranda', amount: -75.00, date: 'Quarta, 25 de fevereiro', icon: 'orange' },
  { id: 38, type: 'expense', title: 'Pix enviado', subtitle: 'Nicolas robert souza da s', amount: -30.00, date: 'Quarta, 25 de fevereiro', icon: 'orange' },
  { id: 39, type: 'expense', title: 'Compra cartao deb mc', subtitle: '24/02 99. pop 24fev 09h57', amount: -6.63, date: 'Terça, 24 de fevereiro', icon: 'orange' },
  { id: 40, type: 'income', title: 'Pix recebido', subtitle: 'Wagner rodrigues dos sant', amount: 300.00, date: 'Terça, 24 de fevereiro', icon: 'blue' },
  { id: 41, type: 'expense', title: 'Pagamento de boleto outros bancos', subtitle: 'Portoseg sa c financ e in', amount: -400.63, date: 'Segunda, 23 de fevereiro', icon: 'orange' },
  { id: 42, type: 'income', title: 'Pix recebido', subtitle: 'Wagner rodrigues dos sant', amount: 1000.00, date: 'Segunda, 23 de fevereiro', icon: 'blue' },
  { id: 43, type: 'expense', title: 'Pix enviado', subtitle: 'Mirian alves dos santos', amount: -20.00, date: 'Segunda, 23 de fevereiro', icon: 'orange' },
  { id: 44, type: 'expense', title: 'Pix enviado', subtitle: 'Correa silva drogaria e p', amount: -18.30, date: 'Segunda, 23 de fevereiro', icon: 'orange' },
  { id: 45, type: 'expense', title: 'Compra cartao deb mc', subtitle: '22/02 99. 99inapppaymentc', amount: -8.24, date: 'Segunda, 23 de fevereiro', icon: 'orange' },
  { id: 46, type: 'expense', title: 'Pix enviado', subtitle: 'Neide batista de souza', amount: -90.00, date: 'Segunda, 23 de fevereiro', icon: 'orange' },
  { id: 47, type: 'expense', title: 'Pix enviado', subtitle: 'Twlf assessoria comercial', amount: -17700.00, date: 'Segunda, 23 de fevereiro', icon: 'orange', isTarget: true },
  { id: 48, type: 'expense', title: 'Compra cartao deb mc', subtitle: '20/02 stafe bank.rmp pape', amount: -39.00, date: 'Sexta, 20 de fevereiro', icon: 'orange' },
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const HeaderIcons = () => (
  <div className="flex items-center gap-4">
    <Search size={22} />
    <Eye size={22} />
    <Bell size={22} />
  </div>
);

// Components
const HomePage = ({ onNavigate }) => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Red Header Section */}
      <div className="bg-santander-red text-white">
        {/* Status Bar space / Top Margin */}
        <div className="h-10"></div>
        
        {/* Top Header Icons */}
        <div className="flex justify-between items-center px-4 mb-6">
          <div className="flex items-center gap-4">
            <Menu size={32} strokeWidth={1.5} />
            <div className="flex items-center mt-1">
              <img src={santanderLogo} alt="Santander Logo" className="h-[22px] object-contain" />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Search size={26} strokeWidth={1.5} />
            <button onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <Eye size={26} strokeWidth={1.5} /> : <EyeOff size={26} strokeWidth={1.5} />}
            </button>
            <Bell size={26} strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex px-4 mb-8">
          <div className="flex-1 text-center pb-3 border-b-4 border-white font-semibold text-[17px]">Santander</div>
          <div className="flex-1 text-center pb-3 text-white/70 text-[17px]">Outros Bancos</div>
        </div>

        {/* Balance Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-1 text-[13px] mb-1 font-medium">
            Saldo Total <Info size={14} className="opacity-80" strokeWidth={1.5} />
          </div>
          <div className="text-[28px] font-bold mb-1 tracking-tight flex items-center justify-center min-h-[42px]">
            {showBalance ? (
              'R$ 860,66'
            ) : (
              <span className="text-[28px] blur-[6px] select-none opacity-80">R$ 860,66</span>
            )}
          </div>
          <div className="text-[12px] mb-5 font-medium opacity-90">
            Saldo + limite
          </div>
          <button 
            onClick={() => onNavigate('extrato')}
            className="text-[14px] font-semibold border-b-[1.5px] border-white pb-0.5"
          >
            Acessar extrato
          </button>
        </div>

        {/* Quick Actions Circles */}
        <div className="flex justify-between items-start px-5 pb-8 gap-2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
              <img src={pixIcon} alt="Pix" className="w-[34px] h-[34px] object-contain" />
            </div>
            <span className="text-[13px] font-medium">Pix</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
              <img src={emprestimosIcon} alt="Empréstimos" className="w-[34px] h-[34px] object-contain" />
            </div>
            <span className="text-[13px] font-medium">Empréstimos</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
              <img src={dindinIcon} alt="DinDin" className="w-[34px] h-[34px] object-contain" />
            </div>
            <span className="text-[13px] font-medium">DinDin</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
              <img src={maisAcoesIcon} alt="Mais ações rápidas" className="w-[34px] h-[34px] object-contain" />
            </div>
            <span className="text-[13px] font-medium text-center leading-tight">Mais ações<br/>rápidas</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#f0f2f5] p-5 overflow-y-auto no-scrollbar">
        <h2 className="text-[20px] font-semibold mb-4 text-gray-800 tracking-tight">Importante para você</h2>
        <div className="bg-white rounded-[16px] p-6 shadow-sm mb-8">
          <p className="text-[15px] text-gray-700 leading-snug mb-5 font-medium">
            Tenha mais uma conta em débito automático: cadastre a fatura do cartão.
          </p>
          <button className="bg-santander-red text-white px-5 py-2 rounded-full font-bold text-[14px]">
            Cadastrar agora
          </button>
        </div>

        <h2 className="text-[20px] font-semibold mb-4 text-gray-800 tracking-tight">Minhas contas</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
          <div className="min-w-[150px] bg-white rounded-[16px] p-5 shadow-sm flex flex-col items-start border border-gray-100">
             <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-santander-red mb-5">
               <div className="border-[2px] border-santander-red w-6 h-4 rounded-[4px] relative">
                 <div className="absolute top-0 right-1 w-1.5 h-1 bg-santander-red"></div>
               </div>
             </div>
             <div className="w-full h-2 bg-gray-100 rounded-full mb-2"></div>
             <div className="w-2/3 h-2 bg-gray-100 rounded-full"></div>
          </div>
          <div className="min-w-[150px] bg-white rounded-[16px] p-5 shadow-sm flex flex-col items-start border border-gray-100 opacity-60">
             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 mb-5">
               <CreditCard size={24} strokeWidth={1.5} />
             </div>
             <div className="w-full h-2 bg-gray-100 rounded-full mb-2"></div>
             <div className="w-2/3 h-2 bg-gray-100 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bg-[#f0f2f5] border-t border-gray-200 flex justify-around py-2.5 pb-6">
        <div className="flex flex-col items-center gap-1 text-santander-red">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={inicioIcon} alt="Início" className="w-[24px] h-[24px] object-contain" />
          </div>
          <span className="text-[10px] font-semibold">Início</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={pagarIcon} alt="Pagar" className="w-[24px] h-[24px] object-contain opacity-50" />
          </div>
          <span className="text-[10px] font-medium">Pagar</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={cartoesIcon} alt="Cartões" className="w-[24px] h-[24px] object-contain opacity-50" />
          </div>
          <span className="text-[10px] font-medium">Cartões</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={chatIcon} alt="Chat" className="w-[24px] h-[24px] object-contain opacity-50" />
          </div>
          <span className="text-[10px] font-medium">Chat</span>
        </div>
      </div>
    </div>
  );
};

const ExtratoPage = ({ onNavigate, onSelectTransaction }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeDate, setActiveDate] = useState(null);
  const dateHeaderRefs = useRef({});

  // Group transactions by date
  const groupedTransactions = TRANSACTIONS.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  const dateKeys = Object.keys(groupedTransactions);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollContainer = e.target;
      const scrollPosition = scrollContainer.scrollTop;
      
      let currentActiveDate = dateKeys[0];
      
      for (const date of dateKeys) {
        const element = dateHeaderRefs.current[date];
        if (element) {
          // If the element is above or just at the top of the container
          if (element.offsetTop - scrollContainer.offsetTop <= scrollPosition + 10) {
            currentActiveDate = date;
          }
        }
      }
      
      if (currentActiveDate !== activeDate) {
        setActiveDate(currentActiveDate);
      }
    };

    const container = document.getElementById('extrato-scroll-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initialize active date
      handleScroll({ target: container });
    }

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, [dateKeys, activeDate]);

  return (
    <div className="flex flex-col h-full bg-white font-sans relative">
      {/* Red Header */}
      <div className="bg-santander-red text-white z-20 relative">
        <div className="h-10"></div>
        <div className="px-4 py-2 flex justify-between items-center">
          <button onClick={() => onNavigate('home')} className="p-1 -ml-2">
            <ChevronLeft size={36} strokeWidth={2.5} />
          </button>
          <span className="text-xl font-bold tracking-tight">Extrato</span>
          <button className="text-[15px] font-semibold tracking-tight px-1">Filtrar</button>
        </div>
      </div>

      {/* Sticky Date Header */}
      <AnimatePresence>
        {activeDate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-[72px] left-0 right-0 z-10 bg-[#f0f2f5] p-2 px-4 flex items-center gap-3 border-b border-gray-200"
          >
            <div className="border border-gray-400 p-0.5 rounded-sm bg-white ml-1">
              <Calendar size={14} className="text-gray-600" strokeWidth={2} />
            </div>
            <span className="text-gray-800 text-[13px]">{activeDate}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="extrato-scroll-container" className="flex-1 overflow-y-auto no-scrollbar relative">
        {/* Balance Info */}
        <div className="p-6 pb-6 bg-white">
          <p className="text-[14px] text-gray-700 mb-1">Saldo disponível</p>
          <div className="flex justify-between items-center mb-6">
            <span className="text-[28px] font-bold text-gray-900 tracking-tight flex items-center min-h-[42px]">
              {showBalance ? (
                'R$ 860,66'
              ) : (
                <span className="text-[28px] blur-[6px] select-none opacity-80 text-gray-900">R$ 860,66</span>
              )}
            </span>
            <button onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <Eye size={26} strokeWidth={1.5} className="text-santander-red" /> : <EyeOff size={26} strokeWidth={1.5} className="text-santander-red" />}
            </button>
          </div>
          <hr className="mb-4 border-gray-200" />
          <p className="text-[14px] text-gray-700 mb-2">Saldo + Limite: R$ 1.660,66</p>
          <button className="text-santander-red text-[14px] mb-8 border-b-[1px] border-santander-red leading-none pb-[2px]">Entenda seu limite</button>
          
          <div className="flex justify-between items-center text-[12px] text-gray-500 mb-2">
            <span>Última atualização às 23:25:45</span>
            <button className="flex items-center gap-1.5 text-santander-red font-medium">
              <RefreshCw size={14} strokeWidth={2.5} /> Atualizar
            </button>
          </div>
        </div>

        {/* Lançamentos Futuros */}
        <div className="bg-[#e9f1f5] p-3 py-4 flex justify-between items-center border-y border-gray-200 mt-2">
          <div className="flex items-center gap-3">
            <div className="border border-gray-400 p-0.5 rounded-sm bg-white ml-1">
              <Calendar size={18} className="text-gray-600" strokeWidth={2} />
            </div>
            <span className="text-[15px] text-gray-800">Lançamentos futuros</span>
          </div>
          <ChevronRight size={24} strokeWidth={1.5} className="text-gray-400" />
        </div>

        {/* Transaction List */}
        <div className="bg-white">
          {Object.entries(groupedTransactions).map(([date, items]) => (
            <div key={date}>
              <div 
                ref={el => dateHeaderRefs.current[date] = el}
                className="bg-[#f0f2f5] p-2 px-4 flex items-center gap-3 border-b border-gray-200"
              >
                <div className="border border-gray-400 p-0.5 rounded-sm bg-white ml-1">
                  <Calendar size={14} className="text-gray-600" strokeWidth={2} />
                </div>
                <span className="text-gray-800 text-[13px]">{date}</span>
              </div>
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 px-6 border-b border-gray-100 flex items-center gap-4 active:bg-gray-50 cursor-pointer bg-white"
                  onClick={() => onSelectTransaction(item)}
                >
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.icon === 'blue' ? 'bg-[#5bc0de]' : 'bg-[#f08c00]'}`}></div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-[14px] font-medium text-gray-800 truncate leading-tight mb-0.5">{item.title}</p>
                    <p className="text-[11px] text-gray-400 truncate leading-tight">{item.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`font-bold text-[14px] whitespace-nowrap ${item.amount < 0 ? 'text-gray-900' : 'text-[#000000]'}`}>
                      {item.amount < 0 ? '-R$' : 'R$'} {Math.abs(item.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <ChevronRight size={18} strokeWidth={1.5} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DetailPage = ({ transaction, onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Red Header */}
      <div className="bg-santander-red text-white">
        <div className="h-10"></div>
        <div className="px-4 py-2 flex justify-between items-center">
          <button onClick={() => onNavigate('extrato')} className="p-1 -ml-2">
            <ChevronLeft size={36} strokeWidth={2.5} />
          </button>
          <span className="text-[19px] font-bold tracking-tight">Detalhe do lançamento</span>
          <button className="p-1"><Share2 size={24} strokeWidth={1.5} /></button>
        </div>
      </div>

      <div className="flex-1 p-6 py-10">
        <p className="text-[14px] font-medium text-gray-500 mb-2">Pix enviado</p>
        <p className="text-[18px] font-medium text-gray-600 mb-1 leading-tight">
          Para <span className="font-bold text-gray-900">Twlf Assessoria Comer</span>
        </p>
        <p className="text-[40px] font-bold text-gray-900 mb-6 tracking-tighter">-R$ 17.700,00</p>
        <p className="text-[14px] font-bold text-gray-800 mb-10">Cartos Scd S A</p>

        <hr className="mb-8 border-gray-200" />

        <div className="space-y-8">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-1">Data e horário</p>
            <p className="text-[16px] font-semibold text-gray-800">Sabado, 21/02/2026 às 14:29</p>
          </div>

          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-1">Saldo em conta após este lançamento</p>
            <p className="text-[16px] font-semibold text-gray-800">-R$ 59,49</p>
          </div>
        </div>
      </div>

      <div className="p-5 mb-6">
        <button 
          onClick={() => onNavigate('comprovante')}
          className="w-full bg-santander-red text-white py-4 rounded-xl font-bold text-[16px] active:scale-[0.98] transition-transform"
        >
          Acessar comprovante
        </button>
      </div>
    </div>
  );
};

const ReceiptPage = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* White Header with Red Icons */}
      <div className="bg-white border-b border-gray-100">
        <div className="h-10"></div>
        <div className="px-4 py-2 flex justify-between items-center">
          <button onClick={() => onNavigate('detail')} className="p-1 -ml-2">
            <ChevronLeft size={36} strokeWidth={2.5} className="text-santander-red" />
          </button>
          <button className="p-1"><Share2 size={24} strokeWidth={1.5} className="text-santander-red" /></button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto no-scrollbar py-8">
        <div className="flex flex-col items-center mb-8">
          <img src={santanderLogo} alt="Santander Logo" className="h-[26px] object-contain mb-4" style={{ filter: 'brightness(0) saturate(100%) invert(12%) sepia(95%) saturate(7482%) hue-rotate(359deg) brightness(94%) contrast(117%)' }} />
          <p className="text-[17px] font-bold text-gray-800 tracking-tight mb-1">Comprovante do Pix</p>
          <p className="text-[11px] font-medium text-gray-400">21/02/2026 - 14:29:39</p>
        </div>

        <div className="space-y-6 px-1">
          <div className="border-b border-gray-100 pb-5">
            <p className="text-[12px] font-medium text-gray-500 mb-1">Valor pago</p>
            <p className="text-[16px] font-bold text-gray-800">R$ 17.700,00</p>
          </div>

          <div className="border-b border-gray-100 pb-5">
            <p className="text-[12px] font-medium text-gray-500 mb-1">Forma de pagamento</p>
            <p className="text-[14px] font-semibold text-gray-800">Ag 02045 Cc 1033659-0</p>
          </div>

          <div className="space-y-6">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-50 pb-2">Dados do recebedor</p>
            <div className="space-y-4">
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">Para</p>
                <p className="text-[14px] font-bold text-gray-800">Twlf Assessoria Comercial Ltda</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">CNPJ</p>
                <p className="text-[14px] font-semibold text-gray-800">63.***.*** /0001-1*</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">Chave</p>
                <p className="text-[14px] font-semibold text-gray-800">63.***.*** /0001-1*</p>
              </div>
              <div className="border-b border-gray-100 pb-5">
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">Instituição</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-50 pb-2">Dados do pagador</p>
            <div className="space-y-4">
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">De</p>
                <p className="text-[14px] font-bold text-gray-800 uppercase">VIVIANE APARECIDA DOS SANTOS</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">CPF</p>
                <p className="text-[14px] font-semibold text-gray-800">***.691.138-**</p>
              </div>
              <div className="border-b border-gray-100 pb-5">
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">Instituição</p>
                <p className="text-[14px] font-semibold text-gray-800">033 - BANCO SANTANDER S.A.</p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-5">
            <p className="text-[12px] font-medium text-gray-500 mb-1">ID/Transação</p>
            <p className="text-[12px] font-semibold text-gray-800 break-all leading-relaxed">E9040088820260221172956204964399</p>
          </div>

          <div className="border-b border-gray-100 pb-5">
            <p className="text-[12px] font-medium text-gray-500 mb-1">Data e hora da transação</p>
            <p className="text-[14px] font-semibold text-gray-800">21/02/2026 - 14:29:39</p>
          </div>
        </div>

        <div className="mt-12 flex justify-between text-[11px] font-medium text-gray-400 border-t border-gray-100 pt-6 mb-8">
          <span>Comprovante do Pix</span>
          <span>1/2</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleSelectTransaction = (transaction) => {
    if (transaction.isTarget) {
      setSelectedTransaction(transaction);
      setCurrentPage('detail');
    }
  };

  return (
    <div className="h-full overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full w-full absolute top-0 left-0"
          >
            <HomePage onNavigate={handleNavigate} />
          </motion.div>
        )}
        {currentPage === 'extrato' && (
          <motion.div
            key="extrato"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="h-full w-full absolute top-0 left-0"
          >
            <ExtratoPage 
              onNavigate={handleNavigate} 
              onSelectTransaction={handleSelectTransaction}
            />
          </motion.div>
        )}
        {currentPage === 'detail' && (
          <motion.div
            key="detail"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="h-full w-full absolute top-0 left-0"
          >
            <DetailPage 
              transaction={selectedTransaction} 
              onNavigate={handleNavigate} 
            />
          </motion.div>
        )}
        {currentPage === 'comprovante' && (
          <motion.div
            key="comprovante"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="h-full w-full absolute top-0 left-0"
          >
            <ReceiptPage onNavigate={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
