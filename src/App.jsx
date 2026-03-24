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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import santanderLogo from './assets/santander_logo.png';
import santanderSelectLogo from './assets/Banco_Santander_Select_Logotipo.svg.png';
import pixIcon from './assets/pix.png';
import pixBlackIcon from './assets/pix black.png';
import emprestimosIcon from './assets/emprestimos.png';
import emprestimosBlackIcon from './assets/emprestimos black.png';
import dindinIcon from './assets/dindin.png';
import dindinBlackIcon from './assets/dindin black.png';
import maisAcoesIcon from './assets/mais acoes rapidas.png';
import maisAcoesBlackIcon from './assets/mais acoes rapidas black.png';
import inicioIcon from './assets/inicio.png';
import pagarIcon from './assets/pagar.png';
import cartoesIcon from './assets/cartoes.png';
import chatIcon from './assets/chat.png';

// Mock Data
const INITIAL_TRANSACTIONS = [
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
  { 
    id: 47, type: 'expense', title: 'Pix enviado', subtitle: 'Twlf assessoria comercial', amount: -17700.00, date: 'Segunda, 23 de fevereiro', icon: 'orange', isTarget: true,
    fullDate: 'Sabado, 21/02/2026 às 14:29',
    receiptDate: '21/02/2026 - 14:29:39',
    receiverName: 'Twlf Assessoria Comercial Ltda',
    receiverDocument: '63.***.*** /0001-1*',
    receiverBank: 'Cartos Scd S A',
    senderName: 'VIVIANE APARECIDA DOS SANTOS',
    senderDocument: '***.691.138-**',
    senderBank: '033 - BANCO SANTANDER S.A.',
    transactionId: 'E9040088820260221172956204964399',
    postBalance: '-R$ 59,49'
  },
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
const HomePage = ({ onNavigate, isSelectMode, onToggleMode, balance }) => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Header Section */}
      <div className={`${isSelectMode ? 'bg-black' : 'bg-santander-red'} text-white`}>
        {/* Status Bar space / Top Margin */}
        <div className="h-10"></div>
        
        {/* Top Header Icons */}
        <div className="flex justify-between items-center px-4 mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('admin')} className="p-1 -ml-1">
              <Menu size={32} strokeWidth={1.5} />
            </button>
            <div className="flex items-center mt-1" onClick={onToggleMode}>
              <img 
                src={isSelectMode ? santanderSelectLogo : santanderLogo} 
                alt="Santander Logo" 
                className={`${isSelectMode ? 'h-[24px]' : 'h-[22px]'} object-contain cursor-pointer`} 
              />
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
              balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            ) : (
              <span className="text-[28px] blur-[6px] select-none opacity-80">{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            )}
          </div>
          <div className="text-[12px] mb-5 font-medium opacity-90">
            Saldo + limite {(balance + 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
            <div className={`w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)]`}>
              <img src={isSelectMode ? pixBlackIcon : pixIcon} alt="Pix" className="w-[34px] h-[34px] object-contain" />
            </div>
            <span className="text-[13px] font-medium">Pix</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
              <img src={isSelectMode ? emprestimosBlackIcon : emprestimosIcon} alt="Empréstimos" className="w-[34px] h-[34px] object-contain" />
            </div>
            <span className="text-[13px] font-medium">Empréstimos</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
              <img src={isSelectMode ? dindinBlackIcon : dindinIcon} alt="DinDin" className="w-[34px] h-[34px] object-contain" />
            </div>
            <span className="text-[13px] font-medium">Investir</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
              <img src={isSelectMode ? maisAcoesBlackIcon : maisAcoesIcon} alt="Mais ações rápidas" className="w-[34px] h-[34px] object-contain" />
            </div>
            <span className="text-[13px] font-medium text-center leading-tight">Mais ações<br/>rápidas</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#f0f2f5] p-5 overflow-y-auto no-scrollbar">
        {!isSelectMode && (
          <>
            <h2 className="text-[20px] font-semibold mb-4 text-gray-800 tracking-tight">Importante para você</h2>
            <div className="bg-white rounded-[16px] p-6 shadow-sm mb-8">
              <p className="text-[15px] text-gray-700 leading-snug mb-5 font-medium">
                Tenha mais uma conta em débito automático: cadastre a fatura do cartão.
              </p>
              <button className={`${isSelectMode ? 'bg-black' : 'bg-santander-red'} text-white px-5 py-2 rounded-full font-bold text-[14px]`}>
                Cadastrar agora
              </button>
            </div>
          </>
        )}

        <h2 className="text-[20px] font-semibold mb-4 text-gray-800 tracking-tight">Minhas contas</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
          <div className="min-w-[150px] bg-white rounded-[16px] p-5 shadow-sm flex flex-col items-start border border-gray-100">
             <div className={`w-10 h-10 ${isSelectMode ? 'bg-gray-100 text-black' : 'bg-red-50 text-santander-red'} rounded-xl flex items-center justify-center mb-5`}>
               <div className={`border-[2px] ${isSelectMode ? 'border-black' : 'border-santander-red'} w-6 h-4 rounded-[4px] relative`}>
                 <div className={`absolute top-0 right-1 w-1.5 h-1 ${isSelectMode ? 'bg-black' : 'bg-santander-red'}`}></div>
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

const ExtratoPage = ({ onNavigate, onSelectTransaction, isSelectMode, balance, transactions }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeDate, setActiveDate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dateHeaderRefs = useRef({});

  // Group transactions by date
  const groupedTransactions = transactions.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  const dateKeys = Object.keys(groupedTransactions);

  useEffect(() => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsRefreshing(false);
    }, 600);
  };

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
      {/* Header */}
      <div className={`${isSelectMode ? 'bg-black' : 'bg-santander-red'} text-white z-20 relative`}>
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
                balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              ) : (
                <span className="text-[28px] blur-[6px] select-none opacity-80 text-gray-900">{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              )}
            </span>
            <button onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <Eye size={26} strokeWidth={1.5} className={isSelectMode ? 'text-black' : 'text-santander-red'} /> : <EyeOff size={26} strokeWidth={1.5} className={isSelectMode ? 'text-black' : 'text-santander-red'} />}
            </button>
          </div>
          <hr className="mb-4 border-gray-200" />
          <p className="text-[14px] text-gray-700 mb-2">Saldo + Limite: {(balance + 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <button className={`${isSelectMode ? 'text-black border-black' : 'text-santander-red border-santander-red'} text-[14px] mb-8 border-b-[1px] leading-none pb-[2px]`}>Entenda seu limite</button>
          
          <div className="flex justify-between items-center text-[12px] text-gray-500 mb-2">
            <span>Última atualização às {lastUpdated}</span>
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`flex items-center gap-1.5 ${isSelectMode ? 'text-black' : 'text-santander-red'} font-medium ${isRefreshing ? 'opacity-50' : ''}`}
            >
              <RefreshCw size={14} strokeWidth={2.5} className={isRefreshing ? 'animate-spin' : ''} /> Atualizar
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

const DetailPage = ({ transaction, onNavigate, isSelectMode }) => {
  if (!transaction) return null;

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Header */}
      <div className={`${isSelectMode ? 'bg-black' : 'bg-santander-red'} text-white`}>
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
        <p className="text-[14px] font-medium text-gray-500 mb-2">{transaction.title}</p>
        <p className="text-[18px] font-medium text-gray-600 mb-1 leading-tight">
          {transaction.amount < 0 ? 'Para ' : 'De '}<span className="font-bold text-gray-900">{transaction.subtitle}</span>
        </p>
        <p className="text-[40px] font-bold text-gray-900 mb-6 tracking-tighter">
          {transaction.amount < 0 ? '-R$' : 'R$'} {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-[14px] font-bold text-gray-800 mb-10">{transaction.receiverBank || 'Banco'}</p>

        <hr className="mb-8 border-gray-200" />

        <div className="space-y-8">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-1">Data e horário</p>
            <p className="text-[16px] font-semibold text-gray-800">{transaction.fullDate || transaction.date}</p>
          </div>

          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-1">Saldo em conta após este lançamento</p>
            <p className="text-[16px] font-semibold text-gray-800">{transaction.postBalance || '-R$ 59,49'}</p>
          </div>
        </div>
      </div>

      <div className="p-5 mb-6">
        <button 
          onClick={() => onNavigate('comprovante')}
          className={`w-full ${isSelectMode ? 'bg-black' : 'bg-santander-red'} text-white py-4 rounded-xl font-bold text-[16px] active:scale-[0.98] transition-transform`}
        >
          Acessar comprovante
        </button>
      </div>
    </div>
  );
};

const ReceiptPage = ({ transaction, onNavigate, isSelectMode }) => {
  const receiptRef = useRef(null);

  if (!transaction) return null;

  const handleShare = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      
      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], 'comprovante.pdf', { type: 'application/pdf' });
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Comprovante Pix',
          files: [file]
        });
      } else {
        pdf.save('comprovante.pdf');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* White Header with Red/Black Icons */}
      <div className="bg-white border-b border-gray-100">
        <div className="h-10"></div>
        <div className="px-4 py-2 flex justify-between items-center">
          <button onClick={() => onNavigate('detail')} className="p-1 -ml-2">
            <ChevronLeft size={36} strokeWidth={2.5} className={isSelectMode ? 'text-black' : 'text-santander-red'} />
          </button>
          <button onClick={handleShare} className="p-1"><Share2 size={24} strokeWidth={1.5} className={isSelectMode ? 'text-black' : 'text-santander-red'} /></button>
        </div>
      </div>

      <div ref={receiptRef} className="flex-1 p-6 overflow-y-auto no-scrollbar py-8 bg-white">
        <div className="flex flex-col items-center mb-8">
          <img 
            src={isSelectMode ? santanderSelectLogo : santanderLogo} 
            alt="Santander Logo" 
            className={`${isSelectMode ? 'h-[28px]' : 'h-[26px]'} object-contain mb-4`} 
            style={isSelectMode ? { filter: 'invert(100%)' } : { filter: 'brightness(0) saturate(100%) invert(12%) sepia(95%) saturate(7482%) hue-rotate(359deg) brightness(94%) contrast(117%)' }} 
          />
          <p className="text-[17px] font-bold text-gray-800 tracking-tight mb-1">Comprovante de transação</p>
          <p className="text-[11px] font-medium text-gray-400">{transaction.receiptDate || transaction.date}</p>
        </div>

        <div className="space-y-6 px-1">
          <div className="border-b border-gray-100 pb-5">
            <p className="text-[12px] font-medium text-gray-500 mb-1">Valor</p>
            <p className="text-[16px] font-bold text-gray-800">
              R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
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
                <p className="text-[14px] font-bold text-gray-800">{transaction.receiverName || transaction.subtitle}</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">CPF/CNPJ</p>
                <p className="text-[14px] font-semibold text-gray-800">{transaction.receiverDocument || '***.***.***-**'}</p>
              </div>
              <div className="border-b border-gray-100 pb-5">
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">Instituição</p>
                <p className="text-[14px] font-semibold text-gray-800">{transaction.receiverBank || 'Banco'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-50 pb-2">Dados do pagador</p>
            <div className="space-y-4">
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">De</p>
                <p className="text-[14px] font-bold text-gray-800 uppercase">{transaction.senderName || 'USUARIO DA SILVA'}</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">CPF</p>
                <p className="text-[14px] font-semibold text-gray-800">{transaction.senderDocument || '***.000.000-**'}</p>
              </div>
              <div className="border-b border-gray-100 pb-5">
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">Instituição</p>
                <p className="text-[14px] font-semibold text-gray-800">{transaction.senderBank || '033 - BANCO SANTANDER S.A.'}</p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-5">
            <p className="text-[12px] font-medium text-gray-500 mb-1">ID/Transação</p>
            <p className="text-[12px] font-semibold text-gray-800 break-all leading-relaxed">{transaction.transactionId || 'E0000000000000000000000000000000'}</p>
          </div>

          <div className="border-b border-gray-100 pb-5">
            <p className="text-[12px] font-medium text-gray-500 mb-1">Data e hora da transação</p>
            <p className="text-[14px] font-semibold text-gray-800">{transaction.receiptDate || transaction.date}</p>
          </div>
        </div>

        <div className="mt-12 flex justify-between text-[11px] font-medium text-gray-400 border-t border-gray-100 pt-6 mb-8">
          <span>Comprovante</span>
          <span>1/1</span>
        </div>
      </div>
    </div>
  );
};

const AdminPage = ({ currentBalance, onUpdateBalance, onAddTransaction, onNavigate, isSelectMode }) => {
  const [balanceInput, setBalanceInput] = useState(currentBalance.toString());
  
  // Transaction Form State
  const [type, setType] = useState('expense');
  const [title, setTitle] = useState('Pix enviado');
  const [subtitle, setSubtitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('Hoje');
  const [receiverName, setReceiverName] = useState('');
  const [receiverDocument, setReceiverDocument] = useState('');
  const [receiverBank, setReceiverBank] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderDocument, setSenderDocument] = useState('');
  const [senderBank, setSenderBank] = useState('');

  const handleSaveBalance = () => {
    onUpdateBalance(parseFloat(balanceInput));
    alert('Saldo atualizado!');
  };

  const generateRandomDoc = () => `***.${Math.floor(Math.random()*900)+100}.${Math.floor(Math.random()*900)+100}-**`;
  const generateRandomId = () => `E${Math.random().toString(36).substring(2, 15).toUpperCase()}${Date.now()}`;

  const handleAddTransaction = () => {
    if (!amount || isNaN(amount)) {
      alert('Digite um valor válido');
      return;
    }

    const now = new Date();
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedDate = now.toLocaleDateString('pt-BR');
    const fullDate = `${date === 'Hoje' ? 'Hoje' : date}, ${formattedDate} às ${formattedTime.slice(0, 5)}`;
    const receiptDate = `${formattedDate} - ${formattedTime}`;

    const parsedAmount = parseFloat(amount);
    const finalAmount = type === 'expense' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

    const newTransaction = {
      id: Date.now(),
      type,
      title: title || (type === 'expense' ? 'Pix enviado' : 'Pix recebido'),
      subtitle: subtitle || receiverName || 'Transferência',
      amount: finalAmount,
      date: date || 'Hoje',
      icon: type === 'expense' ? 'orange' : 'blue',
      isTarget: true,
      fullDate,
      receiptDate,
      receiverName: receiverName || 'Nome do Recebedor',
      receiverDocument: receiverDocument || generateRandomDoc(),
      receiverBank: receiverBank || 'Banco do Recebedor',
      senderName: senderName || 'SEU NOME AQUI',
      senderDocument: senderDocument || generateRandomDoc(),
      senderBank: senderBank || '033 - BANCO SANTANDER S.A.',
      transactionId: generateRandomId(),
      postBalance: (parseFloat(currentBalance) + finalAmount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };

    onAddTransaction(newTransaction);
    alert('Transação criada com sucesso!');
    onNavigate('home');
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] font-sans">
      <div className={`${isSelectMode ? 'bg-black' : 'bg-santander-red'} text-white`}>
        <div className="h-10"></div>
        <div className="px-4 py-2 flex justify-between items-center">
          <button onClick={() => onNavigate('home')} className="p-1 -ml-2">
            <ChevronLeft size={36} strokeWidth={2.5} />
          </button>
          <span className="text-xl font-bold tracking-tight">Painel Admin</span>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <h2 className="text-lg font-bold mb-4">1. Alterar Saldo</h2>
          <div className="flex gap-3">
            <input 
              type="number" 
              value={balanceInput}
              onChange={(e) => setBalanceInput(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 flex-1 outline-none"
              placeholder="Ex: 1500.50"
            />
            <button 
              onClick={handleSaveBalance}
              className={`${isSelectMode ? 'bg-black' : 'bg-santander-red'} text-white px-4 py-2 rounded-lg font-bold`}
            >
              Salvar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-4">2. Criar Transação</h2>
          <p className="text-sm text-gray-500 mb-4">Campos vazios serão gerados automaticamente.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Transação</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none bg-white"
              >
                <option value="expense">Enviado (Gasto/Pix Enviado)</option>
                <option value="income">Recebido (Ganho/Pix Recebido)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                placeholder="Ex: 150.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título (Ex: Pix enviado)</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo (Aparece na lista)</label>
              <input 
                type="text" 
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                placeholder="Ex: Nome da pessoa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data (Agrupamento)</label>
              <input 
                type="text" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                placeholder="Ex: Hoje ou Segunda, 23 de fevereiro"
              />
            </div>

            <hr className="my-4 border-gray-200" />
            <h3 className="font-semibold text-gray-800">Dados do Recebedor</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome (Para)</label>
              <input 
                type="text" 
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
              <input 
                type="text" 
                value={receiverBank}
                onChange={(e) => setReceiverBank(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <hr className="my-4 border-gray-200" />
            <h3 className="font-semibold text-gray-800">Dados do Pagador (Seu app)</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome (De)</label>
              <input 
                type="text" 
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <button 
              onClick={handleAddTransaction}
              className={`w-full ${isSelectMode ? 'bg-black' : 'bg-santander-red'} text-white py-3 rounded-xl font-bold mt-4`}
            >
              Criar Transação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [balance, setBalance] = useState(1250.00);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleSelectTransaction = (transaction) => {
    if (transaction.isTarget) {
      setSelectedTransaction(transaction);
      setCurrentPage('detail');
    }
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
  };

  const handleUpdateBalance = (newBalance) => {
    setBalance(parseFloat(newBalance));
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
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
            <HomePage 
              onNavigate={handleNavigate} 
              isSelectMode={isSelectMode} 
              onToggleMode={toggleSelectMode} 
              balance={balance}
            />
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
              isSelectMode={isSelectMode}
              balance={balance}
              transactions={transactions}
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
              isSelectMode={isSelectMode}
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
            <ReceiptPage 
              transaction={selectedTransaction}
              onNavigate={handleNavigate} 
              isSelectMode={isSelectMode}
            />
          </motion.div>
        )}
        {currentPage === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full absolute top-0 left-0"
          >
            <AdminPage 
              currentBalance={balance}
              onUpdateBalance={handleUpdateBalance}
              onAddTransaction={handleAddTransaction}
              onNavigate={handleNavigate}
              isSelectMode={isSelectMode}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
