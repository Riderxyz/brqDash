USE [TFS_Integradora]
GO
/****** Object:  UserDefinedFunction [dbo].[FN_Calcular_horas_uteis]    Script Date: 27/02/2019 15:15:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER function [dbo].[FN_Calcular_horas_uteis] 
(
    @FROMDATE datetime,                          -- data inicial
    @TODATE datetime,                            -- data final
    @ESTADO nvarchar(15) = 'RJ'        -- Nome, opcional, do local de feriados
) 
returns varchar(25) 
as begin

DECLARE @WORKDAYS INT = [dbo].[FN_DiasUteis] (GETDATE(), @TODATE,@ESTADO)

set @TODATE = (SELECT CASE WHEN (@TODATE < CAST(convert(varchar(11), @TODATE, 121) + '09:00:00' AS datetime)) THEN
											convert(varchar(11), @TODATE, 121) + '09:00:00'
										ELSE	
											@TODATE
										END )

set @TODATE = (SELECT CASE WHEN (@TODATE > CAST(convert(varchar(11), @TODATE, 121) + '18:00:00' AS datetime)) THEN
											convert(varchar(11), @TODATE, 121) + '18:00:00'
										ELSE	
											@TODATE
										END )

DECLARE @MINUTOSDIAS INT =  (SELECT CASE 
										WHEN (@WORKDAYS - 2) > 0 
											then ((@WORKDAYS - 2) * 8 * 60)
										ELSE 
											0
										END 
										
										)

DECLARE @DATAFINAL DATETIME =  (SELECT CASE 
										WHEN CONVERT(varchar(10),GETDATE(), 121) <> CONVERT(varchar(10),@TODATE, 121) 
											then convert(varchar(11), @TODATE, 121) + '09:00:00'
										ELSE 

											GETDATE()
										END 
										
										)
/* AINDA TEM UM ERRO AQUI QUANDO PASSA DE MEIA NOITE ATÉ AS 09 */
declare @horaFimPrimeiroDia int = (SELECT CASE 
										WHEN DATEDIFF(MINUTE,GETDATE(),convert(varchar(11), getdate(), 121) + '18:00:00') > 0 THEN
											DATEDIFF(MINUTE,getdate(),convert(varchar(11), getdate(), 121) + '18:00:00')
										ELSE	
											0
										END )

DECLARE @HORAPRIMEIRODIA INT = 
								(SELECT CASE 
										WHEN DATEDIFF(MINUTE,convert(varchar(11), getdate(), 121) + '09:00:00', @TODATE ) > 0 THEN
											DATEDIFF(MINUTE,convert(varchar(11), getdate(), 121) + '09:00:00', @TODATE )
										ELSE	
											0
										END )


DECLARE @HORAULTIMODIA INT = (SELECT CASE 
										WHEN DATEDIFF(MINUTE, @DATAFINAL, @TODATE) > 0 THEN
											DATEDIFF(MINUTE, @DATAFINAL, @TODATE)
										ELSE	
											0
										END )

DECLARE @TOTAL INT 

IF convert(varchar(11), getdate(), 121) <> convert(varchar(11), @TODATE, 121) 
       SET @TOTAL = (@MINUTOSDIAS + @horaFimPrimeiroDia + @HORAULTIMODIA);
ELSE 
       SET @TOTAL = (@MINUTOSDIAS + @HORAULTIMODIA);


return CONCAT(RIGHT('000'+CAST((@TOTAL / 60) AS VARCHAR(8)),3), ':',  FORMAT((@TOTAL % 60),'0#')) 
 
end;


